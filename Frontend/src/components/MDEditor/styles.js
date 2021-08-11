import styled from 'styled-components'

export const WrapperMDEditor = styled.div`
    width: 100%;
    height: 100%;

    /** Itens do lado direito do menu que eu ocutei */
    .w-md-editor-toolbar ul:nth-last-child(1) li:nth-last-child(3),
    .w-md-editor-toolbar ul:nth-last-child(1) li:nth-last-child(4),
    .w-md-editor-toolbar ul:nth-last-child(1) li:nth-last-child(5) {
        display: none !important;
    }

    #mark{
        color: #f00;
    }

        .mdEditor {
            color: #fff !important;
            border-radius: 8px 8px 5px 5px;
            background-color: #010000;
        }
        .w-md-editor-toolbar {
            border-radius: 5px 5px 0 0;
            background-color:  #252331;
        }
        .w-md-editor-aree {
            width: 100%;
        }
        .w-md-editor-bar{
            z-index: 1;
        }
        /** Links e suas marcações na edição */
        .wmde-markdown-color code[class*="language-"] .token.operator, .wmde-markdown-color code[class*="language-"] .token.entity, .wmde-markdown-color code[class*="language-"] .token.url, .wmde-markdown-color code[class*="language-"] .token.variable{
            background: none !important;
        }
        /** Links e suas marcações */
        .w-md-editor-text-pre .url{
            color: #06e6c6 !important;
        }
        .w-md-editor-text-pre .title, .w-md-editor-text-pre .bold{
            color: #f00 !important;
            opacity: 0.7;
        }
        .wmde-markdown-color code[class*="language-"] .token.regex, .wmde-markdown-color code[class*="language-"] .token.important{
            color: #e90 !important;
        }
        .w-md-editor-text-pre .url .content{
            color: #b6b9f9 !important;
        }
        .opacityw-md-editor-text-pre .url .content{
            color: #b6b9f9 !important;
        }
        .w-md-editor-text-pre .title, .w-md-editor-text-pre .bold{
            color: none !important;
        }

        .language-markdown,
        .w-md-editor-text-input,
        .w-md-editor-text-pre,
        .wmde-markdown-color,
        .w-md-editor-text,
        .erIXCX {
            color: #ddd !important;
        }
        .code-language{
            opacity: 0.3;
        }
        .wmde-markdown-color code[class*="language-"] .token.keyword {
            color: #ec5c06;
        }
        .wmde-markdown-color code[class*="language-"] .token.selector, .wmde-markdown-color code[class*="language-"] .token.attr-name, .wmde-markdown-color code[class*="language-"] .token.string, .wmde-markdown-color code[class*="language-"] .token.char, .wmde-markdown-color code[class*="language-"] .token.function, .wmde-markdown-color code[class*="language-"] .token.builtin{
            color: #c467cb;
        }
        .wmde-markdown-color code[class*="language-"] .token.class-name{
            color: #1198e1 !important;
        }
        /** Estilo do bloco de codigo completo */
        .wmde-markdown-color code[class*="language-"] .code-block{
            color: #1198e1;
            opacity: 0.7;
        }
        .token .property-access{
            color: #ddd;
        }
        /** Pontuações em geral, incluindo ({/}) */
        .punctuation{
            color: #e4b807 !important;
        }
        /** nome das classes que vem logo de inicio como 'console' */
        .wmde-markdown-color code[class*="language-"] .token.class-name{
            color: #ddd;
        }
        /** String */
        .wmde-markdown-color code[class*="language-"] .token.string{
            color: #55d0f4;
        }
        /** Estilo do codigo normal, quando nao especifica a linguagem */
        .w-md-editor-text-pre .code.keyword{
            color: #ddd !important;
            opacity: 0.7;
        }

        /** Area de visualização do editor */
        .w-md-editor-preview {
            display: none;
        }
        > pre {
            background-color: #333 !important;
            > code {
                background-color: #333;
            }
        }
    }

        .wmde-markdown {
            > pre {
                background-color: #010000 !important;
                > code {
                    background-color: #010000;
                    text-shadow: none;
                    color: #1198e1;

                    .token, .property-access {
                        color: #ddd;
                    }
                }
            }
            > code {
                background-color: #010000;
            }
            > p {
                > code {
                    background-color: #010000;
                }
            }

            > h1,
            h2 {
                border: none;
            }

            > hr {
                border: 2px solid #777;
            }

            > blockquote {
                background-color: #333;
                border-radius: 5px 5px 5px 5px;
                margin-left: 20px;
                min-height: 25px;
                > p, > blockquote > p, > blockquote > blockquote > p{
                    color: #ccc;
                }
            }
            > ul,
            > li {
                list-style: circle !important;
            }
            > table {
                tr {
                    background-color: #333;
                    border-top: 1px solid #333;
                    > th,
                    td {
                        border: 1px solid #777;
                    }
                }
            }

        .language-html {
            .punctuation {
                color: #ec5c06;
            }
            .tag {
                color: #ec5c06;
            }
        }

        .keyword {
            color: #ec5c06;
        }
        .function {
            color: #1198e1;
        }
        .method {
            color: #1198e1;
        }
        .string {
            color: #55d0f4;
        }
        .operator {
            color: #ec5c06;
            background: none;
        }
        .punctuation {
            color: #fff;
        }
        .constant {
            color: #ec5c06;
        }

`
