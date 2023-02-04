return fetch('https://nomoreparties.co/v1/plus-cohort-19/cards', {
  headers: {
    authorization: 'fa5cb345-1651-43dc-b82b-65aff8508d21'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
