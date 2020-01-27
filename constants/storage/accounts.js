import Account from "../../models/Account";

export default [
  new Account(1, 1, 'activated', 500, null),
  new Account(2, 1, 'deactivated', 0, [2, 3]),
  new Account(3, 1, 'deactivated', 0, [3]),
  new Account(1, 4, 'DSK', 'activated', 500, null),
  new Account(2, 4, 'OBB', 'deactivated', 0, [2, 3]),
  new Account(3, 4, 'Cash', 'deleted', 0, [3]),
  new Account(4, 4, 'DSK 2', 'activated', 300, null),
  new Account(5, 4, 'OBB 3', 'deactivated', 0, [2, 3]),
  new Account(6, 4, 'DSK', 'activated', 5500, null),
  new Account(7, 4, 'OBB', 'deactivated', 0, [2, 3]),
  new Account(8, 4, 'DSK', 'activated', 500, null),
  new Account(9, 4, 'OBB', 'deleted', 0, [2, 3])
]
