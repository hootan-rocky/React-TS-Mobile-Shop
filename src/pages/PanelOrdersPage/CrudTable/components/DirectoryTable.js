import React, {useState, useMemo, useEffect} from "react";
import SearchBox from "./SearchBox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);


  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { editUser, deleteUser } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  let updateSuggestion = users.filter((user) => {
    return Object.keys(user).some((key) =>
        user[key]
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table>
          <thead>
            <tr>
              <th>تصویر</th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("first_name")}
                  className={getClassNamesFor("first_name")}
                >
                  نام کاربر
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("last_name")}
                  className={getClassNamesFor("last_name")}
                >
                  نام خانوادگی کاربر
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("username")}
                  className={getClassNamesFor("username")}
                >
                  مجموع مبلغ
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("email")}
                  className={getClassNamesFor("email")}
                >
                  زمان ثبت سفارش
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.image}
                      alt={user.first_name + " " + user.last_name}
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.total_bill}</td>
                  <td>{user.order_registration_date}</td>
                  <td>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editUser(user);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DirectoryTable;
