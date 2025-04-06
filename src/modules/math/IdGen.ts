class IDGen {
    private static _id = 0;

    static getId(prefix: string = ""): string {
        const newId = ++IDGen._id;
        if (prefix === "") return "" + newId;
        return prefix + "-" + newId;
    }
}

export {IDGen}