/**
 * ARCHIVO: src/components/pokemon-card.styles.js
 * DESCRIPCIÓN: Archivo dedicado exclusivamente a los estilos.
 */
import { css } from 'https://cdn.jsdelivr.net/npm/lit@3.1.2/+esm';

export const cardStyles = css`
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