export function formatCalendarDate(date: string) {
  const [year, month, day] = date.split('T')[0].split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
