import { Group, Image, SelectProps, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import SelectCustom from '../SelectCustom';

export interface ISelectImageProps extends SelectProps {}

export default function SelectImage({ data, value, clearable, ...props }: ISelectImageProps) {
  // const theme = useTheme();
  clearable = props.required ? false : clearable;

  const optionSelected: any = data?.find((e: any) => e.value === value);

  const image = optionSelected?.image && (
    <Image alt="" src={optionSelected?.image} w={20} h={20} fit="contain" radius={4} />
  );

  const normalize = (str: string = '') =>
    str
      .normalize('NFD') // tách dấu
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  return (
    <SelectCustom
      data={data}
      value={value}
      searchable={true}
      clearable={clearable}
      filter={({ options, search }) => {
        const keyword = normalize(search);

        return options.filter((option: any) => normalize(option.label).includes(keyword));
      }}
      leftSection={image}
      renderOption={(props: any) => {
        const image = props?.option?.image && (
          <Image alt="" src={props?.option?.image} w={20} h={20} fit="contain" radius={4} />
        );

        return (
          <Group flex="1" gap="xs" wrap="nowrap">
            <Group wrap="nowrap" gap={8}>
              {image}

              <Text lineClamp={1} title={props.option.label} style={{ wordBreak: 'break-all' }}>
                {props.option.label}
              </Text>
            </Group>

            {props.checked && (
              <IconCheck
                style={{ marginLeft: 'auto' }}
                stroke={1.5}
                opacity={0.6}
                size={18}
                color="currentColor"
              />
            )}
          </Group>
        );
      }}
      {...props}
    />
  );
}
