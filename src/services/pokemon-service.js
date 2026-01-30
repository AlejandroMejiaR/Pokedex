/**
 * ARCHIVO: src/services/pokemon-service.js
 * DESCRIPCIÓN: Capa de servicio encargada de la comunicación HTTP.
 * PATRÓN: Adapter / Data Mapper.
 * 
 * OBJETIVO: 
 * 1. Aislar la lógica de fetch de los componentes visuales.
 * 2. "Sanitizar" y transformar los datos (Adapter) para que la UI 
 *    no dependa de la estructura exacta de la API externa.
 */

export class PokemonService {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    }

    /**
     * Obtiene una lista inicial de Pokemons y sus detalles básicos.
     * En banca, esto equivaldría a obtener la lista de cuentas del usuario.
     * @param {number} limit - Cantidad de elementos a traer.
     * @param {number} offset - Desplazamiento para paginación.
     */
    async getPokemonList(limit = 16, offset = 0) {
        try {
            // 1. Petición a la lista general
            const url = `${this.baseUrl}?limit=${limit}&offset=${offset}`;
            const response = await fetch(url);
            const data = await response.json();

            // 2. Mapeo de promesas: La lista inicial no tiene la foto, 
            // así que necesitamos pedir el detalle de cada uno.
            // Esto es común cuando hay que agregar información extra a un listado.
            const detailedPromises = data.results.map(async (pokemon) => {
                return await this.getPokemonDetailRaw(pokemon.url);
            });

            const rawList = await Promise.all(detailedPromises);

            // 3. TRANSFORMACIÓN (ADAPTER): 
            // Convertimos la data cruda en nuestro "Modelo de Dominio".
            return rawList.map(raw => this._transformToDomain(raw));

        } catch (error) {
            console.error('[PokemonService] Fallo crítico:', error);
            // En una app real, aquí enviaríamos el error a un sistema de logs remoto.
            return [];
        }
    }

    /**
     * Método auxiliar privado para hacer fetch a una URL específica
     */
    async getPokemonDetailRaw(url) {
        const response = await fetch(url);
        return response.json();
    }

    /**
     * ADAPTER (Sanitización):
     * Recibe el JSON gigante de la API y extrae SOLO lo que necesitamos.
     * Esto previene que datos sensibles o innecesarios lleguen a la UI.
     * 
     * @param {Object} apiResponse - JSON crudo de la API
     * @returns {Object} Objeto limpio y seguro.
     */
    _transformToDomain(apiResponse) {
        return {
            id: apiResponse.id,
            // Saneamiento básico: asegurar que sea string
            name: String(apiResponse.name), 
            // Manejo defensivo: si no hay imagen, poner un placeholder (lógica de UI)
            image: apiResponse.sprites?.front_default || '',
            types: apiResponse.types.map(t => t.type.name),
            // Datos extra para el detalle
            height: apiResponse.height,
            weight: apiResponse.weight,
            stats: apiResponse.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            }))
        };
    }
}