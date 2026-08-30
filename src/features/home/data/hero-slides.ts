export type HeroSlide = {
  id: string
  image: string
  alt: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'campus',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80',
    alt: 'A red-brick university building with a green lawn under a clear blue sky',
  },
  {
    id: 'students',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80',
    alt: 'A student holding notebooks standing in a classroom of peers',
  },
  {
    id: 'library',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Rows of bookshelves in a university library',
  },
  {
    id: 'graduation',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Graduates throwing their caps in the air with a city skyline behind them',
  },
]
