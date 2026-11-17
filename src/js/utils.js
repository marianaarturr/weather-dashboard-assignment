function average(values) {
    const valid = values.filter((v) => typeof v === "number")
    if (valid.length === 0) return null

    const sum = valid.reduce((acc, v) => acc + v, 0)
    return Math.round((sum / valid.length) * 10) / 10
}