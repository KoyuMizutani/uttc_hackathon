package usecase

import (
	"db/dao"
	"db/model"
)

func FetchChannel() ([]model.Channel, error) {
	channels, err := dao.FetchChannel()
	return channels, err
}

func AddChannel(newChannelName string) (string, error) {

	newChannelId := model.CreateId()

	newChannel := model.Channel{
		Name: newChannelName,
		Id:   newChannelId,
	}

	err := dao.AddChannel(newChannel)

	return newChannelId, err
}
