/**
 * ARCHIVO: src/components/pokemon-card.styles.js
 * DESCRIPCIÓN: Archivo dedicado exclusivamente a los estilos.
 */
import { css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';

export const cardStyles = css`
    :host {
        display: block;
    }
    .card {
        background: var(--card-bg, #fff);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        height: 100%; /* Para que todas midan lo mismo en el grid */
        box-sizing: border-box;
    }
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 20px rgba(0,0,0,0.15);
    }
    img {
        width: 120px;
        height: 120px;
        object-fit: contain;
    }
    h3 {
        margin: 10px 0;
        text-transform: capitalize;
        font-size: 1.1rem;
        color: var(--text-color, #333);
    }
    .types {
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
    }
    .type-badge {
        background-color: var(--secondary-color, #2dcccd);
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        text-transform: capitalize;
    }
`;