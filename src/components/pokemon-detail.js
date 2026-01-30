/**
 * ARCHIVO: src/components/pokemon-detail.js
 * DESCRIPCIÓN: Componente de vista de detalle.
 * Muestra información extendida del item seleccionado.
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';
import { cardStyles } from './pokemon-detail.styles.js';

export class PokemonDetail extends LitElement {

    static properties = {
        pokemon: { type: Object } // Recibimos el objeto completo transformado
    };

    static styles = [cardStyles];

    constructor() {
        super();
        this.pokemon = null; // Inicialmente no hay Pokémon seleccionado
    }

    _handleBack() {
        this.dispatchEvent(new CustomEvent('back-clicked', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (!this.pokemon) return html`<p>Cargando detalle...</p>`;

        return html`
            <div class="detail-card">
                <div class="header">
                    <img src="${this.pokemon.image}" alt="${this.pokemon.name}">
                    <h2>${this.pokemon.name}</h2>
                </div>

                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-name">Altura</div>
                        <div>${this.pokemon.height / 10} m</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-name">Peso</div>
                        <div>${this.pokemon.weight / 10} kg</div>
                    </div>
                    ${this.pokemon.stats.map(stat => html`
                        <div class="stat-item">
                            <div class="stat-name">${stat.name}</div>
                            <!-- Barra de progreso simple simulada -->
                            <progress value="${stat.value}" max="150"></progress>
                            <span>${stat.value}</span>
                        </div>
                    `)}
                </div>

                <button @click="${this._handleBack}">← Volver al listado</button>
            </div>
        `;
    }
}

customElements.define('pokemon-detail', PokemonDetail);