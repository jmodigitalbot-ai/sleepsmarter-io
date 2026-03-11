import React from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sc-checkout': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          product?: string
          subdomain?: string
          coupon?: string
        },
        HTMLElement
      >
    }
  }
}
