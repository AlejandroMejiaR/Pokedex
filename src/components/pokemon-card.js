/**
 * ARCHIVO: src/components/pokemon-card.js
 * DESCRIPCIÓN: Componente presentacional (Dumb Component).
 * Solo sabe renderizar una tarjeta.
 */

// Importamos Lit desde CDN para no usar Node_modules en este ejemplo
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';
import { cardStyles } from './pokemon-card.styles.js';

export class PokemonCard extends LitElement {
    
    // Definimos las propiedades reactivas.
    // Si estas cambian, el componente se re-renderiza automáticamente.
    static properties = {
        id: { type: Number },
        name: { type: String },
        image: { type: String },
        types: { type: Array }
    };

    // Estilos encapsulados (Shadow DOM).
    // Estos estilos NO afectan al resto de la página ni viceversa.
    static styles = [cardStyles];

    constructor() {
        super();
        this.types = [];
    }

    /**
     * Método manejador del click.
     * En lugar de navegar aquí, avisamos al padre (Container) que nos clicaron.
     * Esto es el patrón "Events Up".
     */
    _handleClick() {
        // Disparamos un evento personalizado (CustomEvent)
        this.dispatchEvent(new CustomEvent('card-clicked', {
            detail: { id: this.id }, // Enviamos el ID como payload
            bubbles: true,           // El evento sube por el árbol DOM
            composed: true           // Atraviesa el Shadow DOM
        }));
    }

    render() {
        return html`
            <div class="card" @click="${this._handleClick}">
                <!-- Renderizado seguro de imagen con texto alternativo -->
                <img src="${this.image}" alt="Imagen de ${this.name}" loading="lazy">
                
                <h3>${this.name}</h3>
                
                <div class="types">
                    <!-- Uso de directiva map implícita de JS -->
                    ${this.types.map(type => html`
                        <span class="type-badge">${type}</span>
                    `)}
                </div>
            </div>
        `;
    }
}

// Registramos el Web Component en el navegador
customElements.define('pokemon-card', PokemonCard);