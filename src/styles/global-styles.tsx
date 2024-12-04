import { Global, css } from '@emotion/react'

/**
 * GlobalStyle
 * @constructor
 */
export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        p,
        div,
        span,
        a {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        html {
          height: 100%;
        }
        html,
        body {
          width: 100%;
          display: flex;
          color: #444444;
          font-size: 14px;
          box-sizing: border-box;
        }

        body {
          font-family: 'Roboto', sans-serif;
          font-optical-sizing: auto;
          height: max-content;
        }
        #root {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        div {
          display: flex;
        }

        .flex-row {
          flex-direction: row;
        }

        .container {
          width: 100%;
          max-width: 1140px;
          padding-left: 10px;
          padding-right: 10px;
          margin: 0 auto;
        }

        ::placeholder {
          color: #b3b7b9;
          opacity: 1;
        }

        input,
        select {
          font-family: inherit;
          font-size: inherit;
        }
        .flex-1 {
          flex: 1;
        }
        .absolute-fill {
          position: absolute;
          flex: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .fixed-fill {
          position: fixed;
          flex: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .overflow-hidden {
          overflow: hidden;
          overscroll-behavior: none;
        }
        .overflow-x-hidden {
          overflow-x: hidden;
        }
      `}
    />
  )
}
