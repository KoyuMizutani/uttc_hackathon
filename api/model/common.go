package model

import (
	"github.com/oklog/ulid"
	"math/rand"
	"time"
)

func CreateId() string {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	n := ulid.MustNew(ulid.Timestamp(t), entropy)
	return n.String()
}
