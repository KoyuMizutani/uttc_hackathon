package dao

import (
	"db/model"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func FetchChannel() ([]model.Channel, error) {
	db := Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM channels ORDER BY id")

	var channel model.Channel
	var channels []model.Channel

	for rows.Next() {
		err := rows.Scan(&channel.Name, &channel.Id)
		if err != nil {
			fmt.Print(err)
			rows.Close()
			break
		}
		channels = append(channels, channel)
	}
	defer rows.Close()
	return channels, err
}

func AddChannel(newChannel model.Channel) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("INSERT INTO channels (name, id) VALUES (?,?)", newChannel.Name, newChannel.Id)
	return err
}

// func DeleteChannel(id string) error {
// 	db := Connect()
// 	defer db.Close()
// 	_, err := db.Exec("DELETE FROM channels WHERE id = ?", id)
// 	return err
// }

// func EditChannel(name, id string) error {
// 	db := Connect()
// 	defer db.Close()
// 	_, err := db.Exec("UPDATE messages SET name = ? WHERE id = ?", name, id)
// 	return err
// }
