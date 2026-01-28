/**
 * ARCHIVO: src/components/pokemon-detail.js
 * DESCRIPCIÓN: Componente de vista de detalle.
 * Muestra información extendida del item seleccionado.
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';

export class PokemonDetail extends LitElement {

    static properties = {
        pokemon: { type: Object } // Recibimos el objeto completo transformado
    };

    static styles = css`
        :host {
            display: block;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .detail-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
        }
        .header img {
            width: 150px;
            height: 150px;
            background: #f0f0f0;
            border-radius: 50%;
        }
        h2 {
            text-transform: capitalize;
            color: var(--primary-color);
            font-size: 2rem;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 20px;
            text-align: left;
        }
        .stat-item {
            background: #f9f9f9;
            padding: 10px;
            border-radius: 8px;
        }
        .stat-name {
            font-weight: bold;
            color: #666;
            text-transform: capitalize;
        }
        button {
            margin-top: 30px;
            padding: 12px 24px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
        }
        button:hover {
            opacity: 0.9;
        }
    `;

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