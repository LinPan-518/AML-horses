import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const Loading = () => {
  return (
    <Stack spacing={1} sx={{ margin: "20px" }}>
      <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Stack spacing={1} direction="row">
        <Skeleton variant="rounded" width={"20%"} height={50} />
        <Skeleton variant="rounded" width={"20%"} height={50} />
      </Stack>
    </Stack>
  );
};
export default Loading;
