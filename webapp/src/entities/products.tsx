import { ArrayField, ArrayInput, ChipField, Create, Datagrid, Edit, List, NumberInput, SimpleForm, SimpleFormIterator, SingleFieldList, TextField, TextInput, required } from "react-admin";
import { Barcode } from "../components/barcode";

export const ProductCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <ArrayInput source="productSizes">
                <SimpleFormIterator inline disableReordering>
                    <TextInput source="sizeName" helperText={false} />
                    <TextInput source="size" helperText={false} validate={required()} />
                    <NumberInput source="basePrice" helperText={false} validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const ProductEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={required()} />
            <ArrayInput source="productSizes">
                <SimpleFormIterator inline disableReordering>
                    <TextInput source="id" disabled />
                    <TextInput source="sizeName" helperText={false} />
                    <TextInput source="size" helperText={false} validate={required()} />
                    <NumberInput source="basePrice" helperText={false} validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
            <Barcode />
        </SimpleForm>
    </Edit>
)

export const ProductList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <ArrayField source="productSizes" perPage={5}>
                <SingleFieldList linkType={false}>
                    <ChipField source="size" size="small" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);