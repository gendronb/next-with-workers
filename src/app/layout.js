export const metadata = {
  title: 'Test'
}

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <body>
        {children}
      </body>
    </html>
  )
}
