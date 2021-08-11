import styled, { css } from 'styled-components'

export const PreviewMD = css`
    /** Linguagens de programação e marcação */
    .wmde-markdown-color code[class*='language-'] {
        background-color: #111;
        text-shadow: none;
        color: #d3d3d3;

        .token {
            color: #d3d3d3;
        }
        .title {
            display: block;
            padding: 0;
        }
    }

    .wmde-markdown pre {
        background: none;
    }
    .wmde-markdown hr {
        border: 2px solid #777;
    }

    .wmde-markdown table {
        border-radius: 12px;
        overflow: hidden;
        color: #d3d3d3;
        > thead {
            background-color: #444;
            border-radius: 5px 5px 0 0;
        }

        > tr,
        th,
        td {
            padding: 5px;
            color: #d3d3d3;
        }

        > tbody {
            background-color: #666;
        }
    }

    .contains-task-list {
        list-style: none;
    }
`

export const EditMD = css`
    .w-md-editor-toolbar {
        background-color: ${props => props.theme.colors.primary};
        height: auto !important;
        > ul {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            height: 100%;

            .w-md-editor-toolbar-divider {
                display: none;
            }
        }
    }

    .w-md-editor-content .wmde-markdown-color code[class*='language-'] {
        background: none !important;
    }

    .code-language,
    .token {
        color: #d3d3d3;
    }

    .wmde-markdown-color code[class*='language-'] .title {
        display: inherit !important;
    }

    .w-md-editor-text-input {
        margin-top: 10px;
        padding-top: 0px;
    }
`
