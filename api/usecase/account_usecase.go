package usecase

import (
	"db/dao"
	"db/model"
)

func FetchAccount() ([]model.Account, error) {
	accounts, err := dao.FetchAccount()
	return accounts, err
}

func RegisterAccount(newAccountName, newAccountColor string) (string, error) {

	newAccountId := model.CreateId()

	newAccount := model.Account{
		Name:  newAccountName,
		Id:    newAccountId,
		Color: newAccountColor,
	}

	err := dao.RegisterAccount(newAccount)

	return newAccountId, err
}

func DeleteAccount(id string) error {
	err := dao.DeleteAccount(id)
	return err
}

func RenameAccount(name, id string) error {
	err := dao.RenameAccount(name, id)
	return err
}
