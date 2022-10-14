package controller

import (
	"db/usecase"
	"encoding/json"
	"fmt"
	"net/http"
)

func FetchAccount(w http.ResponseWriter) {

	accounts, err := usecase.FetchAccount()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong when searching accounts.\n")
		fmt.Print(err)
		return
	}

	accountsJSON, err := json.MarshalIndent(accounts, "", "")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong.\n")
		fmt.Print(err)
	}

	fmt.Fprint(w, string(accountsJSON))
}

func RegisterAccount(w http.ResponseWriter, r *http.Request) {

	type NewAccountMaterial struct {
		Name  string `json:"name"`
		Color string `json:"color"`
	}

	var newAccountMaterial NewAccountMaterial

	if err := json.NewDecoder(r.Body).Decode(&newAccountMaterial); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	id, err := usecase.RegisterAccount(newAccountMaterial.Name, newAccountMaterial.Color)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte(id))
}

func DeleteAccount(w http.ResponseWriter, r *http.Request) {

	type DeleteId struct {
		Id string `json:"id"`
	}
	var deleteId DeleteId

	if err := json.NewDecoder(r.Body).Decode(&deleteId); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	if err := usecase.DeleteAccount(deleteId.Id); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte("200 OK"))
}

func RenameAccount(w http.ResponseWriter, r *http.Request) {

	type RenameAccount struct {
		Name string
		Id   string
	}
	var renameAccount RenameAccount

	if err := json.NewDecoder(r.Body).Decode(&renameAccount); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	if err := usecase.RenameAccount(renameAccount.Name, renameAccount.Id); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte("200 OK"))
}
