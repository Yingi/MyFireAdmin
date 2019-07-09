// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  DisabledInput,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField

} from "react-admin";
//import RichTextInput from "ra-input-rich-text";

const DriverFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="FirstName" alwaysOn />
  </Filter>
);

export const DriverList = (props) => (
  <List {...props} filters={<DriverFilter />}>
    <Datagrid>
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <TextField source="PhoneNumber" />
      <TextField source="Email" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

export const DriverShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <RichTextField source="PhoneNumber" />
      <RichTextField source="Email" />

    </SimpleShowLayout>
  </Show>
);

export const DriverCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextField source="id" />
      <TextField source="FirstName" />
      <TextField source="LastName" />
      <RichTextField source="PhoneNumber" />
      <RichTextField source="Email" />
    </SimpleForm>
  </Create>
);

export const DriverEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="FirstName" />
      <DisabledInput source="LastName" />
      <TextInput source="PhoneNumber" />
      <DisabledInput source="Email" />
      
      
      
      
    </SimpleForm>
  </Edit>
);
