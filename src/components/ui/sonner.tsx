import { Toaster as Sonner, type ToasterProps } from "sonner"
import { useTheme } from "@/contexts/ThemeContext"

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useTheme()

  const lightStyle = {
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    color: '#000000',
  }

  const darkStyle = {
    background: 'rgba(1, 1, 1, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#ffffff',
  }

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      offset={48}
      toastOptions={{
        style: isDark ? darkStyle : lightStyle,
        classNames: {
          toast: isDark 
            ? 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-md bg-black/80 border-white/10'
            : 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-md bg-white/80 border-black/10',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
