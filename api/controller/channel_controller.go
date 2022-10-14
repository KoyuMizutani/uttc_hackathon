package controller

import (
	"db/usecase"
	"encoding/json"
	"fmt"
	"net/http"
)

func FetchChannel(w http.ResponseWriter) {

	channels, err := usecase.FetchChannel()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong when searching channels.\n")
		fmt.Print(err)
		return
	}

	channelsJSON, err := json.MarshalIndent(channels, "", "")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(w, "Something went wrong.\n")
		fmt.Print(err)
	}

	fmt.Fprint(w, string(channelsJSON))
}

func AddChannel(w http.ResponseWriter, r *http.Request) {

	type NewChannel struct {
		Name string `json:"name"`
	}
	var newChannel NewChannel

	if err := json.NewDecoder(r.Body).Decode(&newChannel); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Something wrong. \n")
		fmt.Print(err)
		return
	}

	id, err := usecase.AddChannel(newChannel.Name)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Cannot register the user.\n")
		fmt.Print(err)
		return
	}

	w.Write([]byte(id))
}
