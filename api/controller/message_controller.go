package controller

import (
	"db/usecase"
	"encoding/json"
	"fmt"
	"net/http"
)

func FetchMessage(w http.ResponseWriter) {

	messages, err := usecase.FetchMessage()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong when searching messages.\n")
		fmt.Print(err)
		return
	}

	messagesJSON, err := json.MarshalIndent(messages, "", "")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong.\n")
		fmt.Print(err)
	}

	fmt.Fprint(w, string(messagesJSON))
}

func AddMessage(w http.ResponseWriter, r *http.Request) {

	type NewMessageInfo struct {
		Content string `json:"content"`
		Sender  string `json:"sender"`
		Channel string `json:"channel"`
	}
	var newMessageInfo NewMessageInfo

	if err := json.NewDecoder(r.Body).Decode(&newMessageInfo); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	if err := usecase.AddMessage(newMessageInfo.Content, newMessageInfo.Sender, newMessageInfo.Channel); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte("201 Created"))
}

func DeleteMessage(w http.ResponseWriter, r *http.Request) {

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

	if err := usecase.DeleteMessage(deleteId.Id); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte("200 OK"))
}

func EditMessage(w http.ResponseWriter, r *http.Request) {

	type EditedMessage struct {
		Content string
		Id      string
		Edited  bool
	}
	var editedMessage EditedMessage

	if err := json.NewDecoder(r.Body).Decode(&editedMessage); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	if err := usecase.EditMessage(editedMessage.Content, editedMessage.Id); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte("200 OK"))
}

func FetchBookMark(w http.ResponseWriter, r *http.Request) {

	id := r.URL.Query().Get("accountId")

	messages, err := usecase.FetchBookMark(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong when searching messages.\n")
		fmt.Print(err)
		return
	}

	messagesJSON, err := json.MarshalIndent(messages, "", "")

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong.\n")
		fmt.Print(err)
	}

	fmt.Fprint(w, string(messagesJSON))
}
