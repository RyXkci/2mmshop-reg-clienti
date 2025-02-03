import { useContext } from "react";
import { ClientContext } from "../context/ClientContext";

export const useClient = () => {
    const context = useContext(ClientContext);

    if (context === undefined) {
        throw new Error("useClient() bust be inside a clientProvider")
    }

    return context;
}