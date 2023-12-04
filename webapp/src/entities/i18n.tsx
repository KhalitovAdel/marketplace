import { Create, Datagrid, List, SimpleForm, TextInput, required, TextField, Edit, FilterLiveSearch } from "react-admin";

export const i18nCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="path" validate={required()} fullWidth />
            <TextInput source="value" validate={required()} fullWidth />
        </SimpleForm>
    </Create>
);


export const i18nEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="path" validate={required()} fullWidth />
            <TextInput source="value" validate={required()} fullWidth />
        </SimpleForm>
    </Edit>
);

export const i18nList = () => (
    // eslint-disable-next-line react/jsx-key
    <List filters={[<FilterLiveSearch source="q" alwaysOn />]}>
        <Datagrid rowClick="edit">
            <TextField source="path" />
            <TextField source="value" />
        </Datagrid>
    </List>
);