package usecase

import (
	"db/dao"
	"db/model"
	"time"
)

func FetchMessage() ([]model.Message, error) {
	messages, err := dao.FetchMessage()
	return messages, err
}

func AddMessage(newMessageContent, newMessageSender, newMessageChannel string) error {

	newMessageId := model.CreateId()

	newMessage := model.Message{
		Content: newMessageContent,
		Id:      newMessageId,
		Sender:  newMessageSender,
		Channel: newMessageChannel,
		Date:    time.Now().Format("2006-01-02 15:04:05"),
		Edited:  false,
	}

	err := dao.AddMessage(newMessage)

	return err
}

func DeleteMessage(id string) error {
	err := dao.DeleteMessage(id)
	return err
}

func EditMessage(content, id string) error {
	err := dao.EditMessage(content, id)
	return err
}

func FetchBookMark(id string) ([]model.Message, error) {
	messages, err := dao.FetchBookMark(id)
	return messages, err
}
