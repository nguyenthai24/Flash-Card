import { FileInput } from "@mantine/core";
import { IoMdCloudUpload } from "react-icons/io";

export const MantineFileInput = FileInput.extend({
  defaultProps: {
    size: "md",
    rightSection: <IoMdCloudUpload />,
  },
});
