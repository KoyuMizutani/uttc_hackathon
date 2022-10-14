package dao

import (
	"db/model"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func RegisterAccount(newAccount model.Account) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("INSERT INTO accounts (name, id, color) VALUES (?,?,?)", newAccount.Name, newAccount.Id, newAccount.Color)
	return err
}

func FetchAccount() ([]model.Account, error) {
	db := Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM accounts")

	var account model.Account
	var accounts []model.Account

	for rows.Next() {
		err := rows.Scan(&account.Name, &account.Id, &account.Color)
		if err != nil {
			fmt.Print(err)
			rows.Close()
			break
		}
		accounts = append(accounts, account)
	}
	defer rows.Close()

	return accounts, err
}

func DeleteAccount(id string) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("DELETE FROM accounts WHERE id = ?", id)
	if err != nil {
		fmt.Println(err)
	}
	_, err = db.Exec("DELETE FROM likes WHERE accountId = ?", id)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func RenameAccount(name, id string) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("UPDATE accounts SET name = ? WHERE id = ?", name, id)
	return err
}
