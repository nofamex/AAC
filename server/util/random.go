package util

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

func RandomPaket() int {
	return rand.Intn(2) + 1
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

func RandomOrderUnac(paket int) string {
	pg := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50}
	isian := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })
	rand.Shuffle(len(isian), func(i, j int) { isian[i], isian[j] = isian[j], isian[i] })

	a := append(pg, isian...)
	for i := 0; i < len(a); i++ {
		a[i] += (paket - 1) * 40
	}
	return fmt.Sprint(a)
}

func RandomOrderTac(paket int) string {
	pg := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60}

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(pg), func(i, j int) { pg[i], pg[j] = pg[j], pg[i] })

	a := pg
	for i := 0; i < len(a); i++ {
		a[i] += (paket - 1) * 40
	}
	return fmt.Sprint(a)
}
