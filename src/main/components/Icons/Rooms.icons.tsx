import React from 'react';

export const SearchIcon = () => (
  <svg
    className="search"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="26"
    height="26"
    viewBox="0 0 32 32"
    style={{ fill: '#000000' }}>
    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
  </svg>
);

export const FilterIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    onClick={onClick}
    aria-hidden="true"
    height="16"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    data-view-component="true"
    className="filter">
    <path
      fillRule="evenodd"
      fill="#acbac7"
      d="M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 015.75 7.5h-2.5A1.75 1.75 0 011.5 5.75v-2.5zM3.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5A.25.25 0 006 5.75v-2.5A.25.25 0 005.75 3h-2.5zM1.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zM3.25 10a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 018.5 5.75v-2.5zM10.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5zM8.5 10.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75v-2.5zm1.75-.25a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-2.5z"></path>
  </svg>
);

export const UsersIcon = () => (
  <svg
    aria-hidden="true"
    height="16"
    viewBox="0 0 16 16"
    version="1.1"
    width="16"
    data-view-component="true"
    className="users">
    <path
      fillRule="evenodd"
      fill="#acbac7"
      d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
  </svg>
);

export const PasswordOnIcon = () => (
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAB+UlEQVRoge2Zy0oDMRSGPy2IYJ9AvHQhfQjrA3hZCC70IUTFh/C2UNciiBsvuFAEH0ZwI9qLayso2loXOcOIrc5MJulEmg9ChjD5c35ym2TA47FCnwXNMWAemAMKwIiUl4F74Aa4Bh4ttG2EEeAAaACtiNQELlBGnWIBeEEF+QqcAItAERiSVASWgFPgTd6to3rPCdaBT1RgJ6ihFcU4cEbYO2vWoovJggTyASxr1F+Ruk0y7JlRwuGkYyJgVTSegWEDcSXmiHA4peVctA4NaCViDLU6vRJvTkRRQC0ADcLlOhH9mg3PAzngEnjQ1PjOPXAlmlpzRdfIrOTXmvU7EWjNGdSM5A41picMahZF89agZiR1aTRvUDNPuEl2jeBTwxld3TniHN6Ia/SEkQFgB6jSfp4IiDp3JE2/6VaALYkpMdsWAk2bNnWMVKTypE5lw5QIeyYxtvYKXf6Mpycm+7/CG3ENb8Q1bBoZBPaBGurrYE/Kuk7afWSf9p15N4t40hqp0W7kKYVeZhtio0PZu63GbBo5jllmnbRDK0f70MrZiuevHz2tGO/EaTxue3G1Omr4fSQm5W/Pmf1qM3EemUHdDT8A01nF4w9WWeCNuIY34ho9YaQqeakbgUQwJbnWBd0W2V+R/kwbOkYGxExwdZplKouJXy+xvwCa8grIE/iNkQAAAABJRU5ErkJggg==" />
);

export const PasswordOffIcon = () => (
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACvElEQVRoge2ZvWsUQRiHn4un4qGihTk1YrhCxBTaaKGk0UoLPxCD+NUL6t9gYW0sBC1CIIVYqYWC342FMSqCyIEmgqCSYM5CIeAZNTmLWTU3N7vZ+Xj3jsMH3mJndt/5/Wb2Y2YW2oScQM4NwH5gB7Aa6IrKx4FJYBi4CYwKtB2EA8BLoJYyykAfMp3pRA/wmPQG9HgGbMlctcZu4Ctmgd9Qvf4AuA28AL7HnDsFHMxY+1+OA78Mom6hbrOC4ZpFwB7gOjCrXTcLnBZXrbGdxt4dBXotcmwFXmk5ZlCdkAlFYEITcB9Y4ZBrCXBDy/UFWBtE6Txc1BoeiQS5kgfuajmvemqclxIwPafBCupb4ctK6kd5IkDORPqp77kzAXPvQr3pasC5gHmNvOWfiXHUWygkS4F1gXM2sIn60bgk3aANHRbnbtaO74QU4ouNkTXa8buQQnyxMVLUjishhfhiY2SxdjwdUogvNkZamrYxkrc4dwy4hnr1AvwML8cdm9VZAegku1GsAZ+AaohkedQaoYz7CtA3ysApYIGriQLwsIkG9LiH4yx7qAXE6zFoa6KHxqVoK8QMsNEkOO7B3UsLbdPMoQPYF1dholtOizclU2GckYWCQnwxamubL/t/Iyn4iNrEWxXFiagsUwbwe01WgPWGvN3AZ8/cAybBUiPSD3wwlL+P6oIjZWQ4oW5EokEpI8sT6pZJNChl5LBjnTNSRo4BR2PKj0g0KGUkh3kqUUJoDif5HXmUsiwIUkaqwHND+VPURnVwpIw8wbzv9QNlJjhSRl471jljsx1kQx9qVCa18iJwSKLBOCO+WzCdwBXPHHEYn7G4W2tMSEQI3tic3EX8z/1mRpXG3xtA/KbXFGq0dtq4z4CzOPxgygEXaP4o/InzJMwK0kwXeoGTwDbUSi9LKqgP62WSlwbtw2+zb5gwjTnMhgAAAABJRU5ErkJggg==" />
);
