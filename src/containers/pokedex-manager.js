/**
 * ARCHIVO: src/containers/pokedex-manager.js
 * DESCRIPCIÓN: Smart Component / Container.
 * 
 * RESPONSABILIDADES:
 * 1. Gestionar el estado de la aplicación (¿Estoy viendo la lista o el detalle?).
 * 2. Comunicarse con el Servicio (PokemonService).
 * 3. Escuchar eventos de los componentes hijos y reaccionar.
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';
import { PokemonService } from '../services/pokemon-service.js';

// Importamos los componentes hijos para usarlos en el render
import '../components/pokemon-card.js';
import '../components/pokemon-detail.js';

export class PokedexManager extends LitElement {

    static properties = {
        pokemons: { type: Array },      // Lista de datos
        view: { type: String },         // Control de navegación: 'list' | 'detail'
        selectedPokemon: { type: Object }, // Datos del pokemon seleccionado
        isLoading: { type: Boolean },

        currentPage: { type: Number},
        itemsPerPage: { type: Number}
    };

    static styles = css`
        :host {
            display: block;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
            gap: 20px;
            padding: 20px 0;
        }
        h1 {
            color: #ffffff;
            text-align: center;
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            align-items: center;
        }

        button.page-btn {
            padding: 10px 20px;
            background: var(--primary-color, #004481);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }

        button.page-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .page-info {
            font-weight: bold;
        }

        .loading {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
        }
    `;

    constructor() {
        super();
        this.pokemons = [];
        this.view = 'list'; // Estado inicial
        this.selectedPokemon = null;
        this.isLoading = false;

        //paginado
        this.currentPage = 1;
        this.itemsPerPage = 16;
        
        // Instanciamos el servicio (Inyección de dependencias manual)
        this.pokemonService = new PokemonService();
    }

    /**
     * Ciclo de vida: firstUpdated
     * Se ejecuta una vez cuando el componente se ha montado en el DOM.
     * Ideal para llamadas a API iniciales.
     */
    async firstUpdated() {
        this._loadData();
        this.isLoading = true;
        // Llamada asíncrona al servicio
        this.isLoading = false;
    }

    async _loadData() {
        this.isLoading = true;
        //Calular la pagina actual del paginado
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        
        //obtener desde el servicio con los parametros dinamicos LIMIT Y OFFSET
        this.pokemons = await this.pokemonService.getPokemonList(this.itemsPerPage, offset);
        
        this.isLoading = false;
    }

    // Funciones para cambiar de página
    _nextPage() {
        this.currentPage++;
        this._loadData(); // Recargamos datos
    }

    _prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this._loadData(); // Recargamos datos
        }
    }

    /**
     * Manejador de evento: Cuando una card hija avisa que fue clickeada.
     */
    _onCardClicked(e) {
        const id = e.detail.id;
        // Buscamos el pokemon en nuestro estado local
        this.selectedPokemon = this.pokemons.find(p => p.id === id);
        
        if (this.selectedPokemon) {
            this.view = 'detail'; // Cambiamos la vista (Navegación SPA)
        }
    }

    /**
     * Manejador de evento: Volver atrás
     */
    _onBackClicked() {
        this.selectedPokemon = null;
        this.view = 'list';
    }

    /**
     * Función auxiliar para renderizar la vista de Lista
     */
    _renderList() {
        if (this.isLoading) {
            return html`<div class="loading">Cargando datos de forma segura...</div>`;
        }

        return html`
            <div class="grid">
                ${this.pokemons.map(poke => html`
                    <!-- 
                        Props Down: Pasamos datos primitivos al hijo.
                        Events Up: Escuchamos eventos (@nombre-evento).
                    -->
                    <pokemon-card 
                        .id="${poke.id}"
                        .name="${poke.name}"
                        .image="${poke.image}"
                        .types="${poke.types}"
                        @card-clicked="${this._onCardClicked}">
                    </pokemon-card>
                `)}
            </div>
            <!-- CONTROLES DE PAGINACIÓN -->
            <div class="pagination">
                <button 
                    class="page-btn" 
                    @click="${this._prevPage}" 
                    ?disabled="${this.currentPage === 1}">
                    Anterior
                </button>
                
                <span class="page-info">Página ${this.currentPage}</span>
                
                <button 
                    class="page-btn" 
                    @click="${this._nextPage}">
                    Siguiente
                </button>
            </div>
        `;
    }

    /**
     * Función auxiliar para renderizar la vista de Detalle
     */
    _renderDetail() {
        return html`
            <pokemon-detail 
                .pokemon="${this.selectedPokemon}"
                @back-clicked="${this._onBackClicked}">
            </pokemon-detail>
        `;
    }

    render() {
        return html`
            <header>
                <h1>Banca Pokedex</h1>
            </header>
            
            <main>
                <!-- Renderizado Condicional (Routing simple) -->
                ${this.view === 'list' 
                    ? this._renderList() 
                    : this._renderDetail()
                }
            </main>
        `;
    }
}

customElements.define('pokedex-manager', PokedexManager);