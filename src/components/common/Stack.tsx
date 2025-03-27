import { Stack, StackProps } from "@chakra-ui/react";

/** alignItems: center; justifyContent: center; gap: 0; */
export function CStack({ ...props }: StackProps) {
	return <Stack alignItems={"center"} justifyContent={"center"} gap="0" {...props} />;
}
