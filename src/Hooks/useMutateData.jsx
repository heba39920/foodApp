import { useMutation} from "@tanstack/react-query";
import { axiosInstance } from "../Constants/CONTENT-END-POINTS";


export default function useMutateData() {
  const AddData = async (url, data) => {
    const response = await axiosInstance.post(url, data);
    return response?.data;
    
  };

  const UpdateData = async ({url, data}) => {
    const response = await axiosInstance.put(url, data);
    return response?.data;
  };

  const AddMutation = useMutation({mutationFn:AddData});
  const UpdateMutation = useMutation({mutationFn:UpdateData});
  const mutate = (params) => {    
    if (params.mode === "add") {
      return AddMutation.mutateAsync(params?.url, params?.data);
    } else if (params.mode === "update") {
      return UpdateMutation.mutateAsync({ url: params?.url, data: params?.data });
    }
  };

  return { mutate, AddStatus: AddMutation.status, UpdateStatus: UpdateMutation.status };
}