export const preparePageNumbers = (
  page: number,
  pagesCount: number
): (number | string)[] => {
  const pageNumbers: (number | string)[] = [];
  const maxPagesToShow = 5; // Максимальное количество видимых страниц (например, 1 2 3 4 5 или 1 ... 4 5 6 ... 10)

  if (pagesCount <= maxPagesToShow + 2) {
    // Если страниц мало, показываем все
    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Логика для отображения "..."
    if (page <= maxPagesToShow - 2) {
      // В начале
      for (let i = 1; i <= maxPagesToShow; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(pagesCount);
    } else if (page > pagesCount - (maxPagesToShow - 2)) {
      // В конце
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = pagesCount - (maxPagesToShow - 1); i <= pagesCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      // В середине
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (
        let i = page - Math.floor((maxPagesToShow - 3) / 2);
        i <= page + Math.ceil((maxPagesToShow - 3) / 2);
        i++
      ) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(pagesCount);
    }
  }
  return pageNumbers;
};
