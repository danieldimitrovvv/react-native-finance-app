import Account from '../../models/Account'
import User from '../../models/User'


export default [
  new Account(1, 1, 'OBB', 'activated', 500, null),
  new Account(2, 1, 'Raiffeisen Bank', 'deactivated', 0, [
    new User(
      2,
      'ivangeorgiev@abv.bg',
      'ivn123!ivn',
      'Ivan Georgiev',
      'male',
      'married',
      'Behaviour',
      23
    ),
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(3, 1, 'OBB', 'deactivated', 0, [
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(4, 4, 'DSK', 'activated', 500, null),
  new Account(5, 4, 'OBB', 'deactivated', 0, [
    new User(
      2,
      'ivangeorgiev@abv.bg',
      'ivn123!ivn',
      'Ivan Georgiev',
      'male',
      'married',
      'Behaviour',
      23
    ),
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(6, 4, 'Cash', 'deleted', 0, [
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(7, 4, 'DSK 2', 'activated', 300, null),
  new Account(8, 4, 'OBB 3', 'deactivated', 0, [
    new User(
      2,
      'ivangeorgiev@abv.bg',
      'ivn123!ivn',
      'Ivan Georgiev',
      'male',
      'married',
      'Behaviour',
      23
    ),
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(9, 4, 'DSK', 'activated', 5500, null),
  new Account(10, 4, 'OBB', 'deactivated', 0, [
    new User(
      2,
      'ivangeorgiev@abv.bg',
      'ivn123!ivn',
      'Ivan Georgiev',
      'male',
      'married',
      'Behaviour',
      23
    ),
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ]),
  new Account(11, 4, 'DSK', 'activated', 500, null),
  new Account(12, 4, 'OBB', 'deleted', 0, [
    new User(
      1,
      'danieldimitrovvv@abv.bg',
      'dan123!dan',
      'Daniel Dimitrov',
      'male',
      'single',
      'Master',
      24
    ),
    new User(
      2,
      'ivangeorgiev@abv.bg',
      'ivn123!ivn',
      'Ivan Georgiev',
      'male',
      'married',
      'Behaviour',
      23
    ),
    new User(
      3,
      'iva.pertiva@abv.bg',
      'iva123!iva',
      'Iva Petrova',
      'female',
      'single',
      'Master',
      27
    )
  ])
]
