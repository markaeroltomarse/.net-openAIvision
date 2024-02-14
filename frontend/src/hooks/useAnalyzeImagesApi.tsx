import { TAnalyzeImageResponse } from '@/types/vision.types';
import axios from 'axios';
import { useCallback, useState } from "react";
export interface useAnalyzeImagesApiProps {

}

const useAnalyzeImagesApi = (props?: useAnalyzeImagesApiProps) => {
    const API = 'http://localhost:5000/api/v1/development/vision'

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const [data, setData] = useState<TAnalyzeImageResponse | null>(null)

    const reset = () => {
        setError(null)
        setData(null)
        setIsLoading(false)
    }

    const run = useCallback(async (base64Images: string[]) => {
        setIsLoading(true)
        try {
            const res = await axios.post(API, { base64Images })
            console.log(res.data.data)
            setData(res.data.data)
            setIsLoading(false)
            return res.data
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [])

    return {
        run, reset, isLoading, error, data
    }
};

export default useAnalyzeImagesApi;
