package util

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

func RandomPaket() int {
	rand.Seed(time.Now().UnixNano())
	pg := []int{1,2,3}
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })
	return pg[0]
}

func RandomOrderUnacSimul() string {
	pg := []int{151, 152, 153, 154, 155, 156, 157, 158, 159, 160}
	isian := []int{31, 32, 33, 34, 35}

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })
	rand.Shuffle(len(isian), func(i, j int) { isian[i], isian[j] = isian[j], isian[i] })

	a := append(pg, isian...)
	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b)
}

func RandomOrderTacSimul() string {
	pg := []int{182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196}
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })

	a := pg
	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b)
}

func RandomOrderUnac(pg, isian []int32) string {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })
	rand.Shuffle(len(isian), func(i, j int) { isian[i], isian[j] = isian[j], isian[i] })

	a := append(pg, isian...)
	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b)
}

func RandomOrderTac(pg []int32) string {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })

	a := append(pg)
	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b)
}

func RandomPaketSandwich() (string, []int) {
	pg := []int{4, 5, 6}
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })

	a := pg
	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b), a
}

func RandomOrderSandwich(paket int) string {
	pg := []int{46, 47, 48, 49, 50, 51, 52, 53, 54, 55}
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })

	a := pg
	for i := 0; i < len(a); i++ {
		a[i] += (paket - 3) * 10
	}

	b, _ := json.Marshal(a)
	return fmt.Sprintf("%s", b)
}
