package model

type Message struct {
	Content string `json:"content"`
	Id      string `json:"id"`
	Sender  string `json:"sender"`
	Channel string `json:"channel"`
	Date    string `json:"date"`
	Edited  bool   `json:"edited"`
}
