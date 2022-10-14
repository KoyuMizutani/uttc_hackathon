package dao

import (
	"db/model"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func FetchMessage() ([]model.Message, error) {
	db := Connect()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM messages ORDER BY date")

	var message model.Message
	var messages []model.Message

	for rows.Next() {
		err := rows.Scan(&message.Content, &message.Id, &message.Sender, &message.Channel, &message.Date, &message.Edited)
		if err != nil {
			fmt.Print(err)
			rows.Close()
			break
		}
		messages = append(messages, message)
	}
	defer rows.Close()
	return messages, err
}

func AddMessage(newMessage model.Message) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("INSERT INTO messages (content, id, sender, channel, date, edited) VALUES (?,?,?,?,?,?)", newMessage.Content, newMessage.Id, newMessage.Sender, newMessage.Channel, newMessage.Date, newMessage.Edited)
	return err
}

func DeleteMessage(id string) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("DELETE FROM messages WHERE id = ?", id)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

func EditMessage(content, id string) error {
	db := Connect()
	defer db.Close()
	_, err := db.Exec("UPDATE messages SET content = ?, edited = true WHERE id = ?", content, id)
	return err
}

func FetchBookMark(id string) ([]model.Message, error) {
	db := Connect()
	defer db.Close()

	rows, err := db.Query("SELECT content, id, sender, channel, date, edited FROM messages INNER JOIN likes ON id = messageId WHERE accountId = ? ORDER BY date", id)

	var message model.Message
	var messages []model.Message

	for rows.Next() {
		err := rows.Scan(&message.Content, &message.Id, &message.Sender, &message.Channel, &message.Date, &message.Edited)
		if err != nil {
			fmt.Print(err)
			rows.Close()
			break
		}
		messages = append(messages, message)
	}
	defer rows.Close()
	return messages, err
}
