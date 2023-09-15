type Method = "Create" | "Read" | "Update" | "Delete";
type Data = {
  [key: string]: any;
};
export class Protocol {
  send(type: Method, header: string, data?: Data) {
    return {
      type,
      header,
      data,
    };
  }
  error(message: string, location: string) {
    return {
      message,
      location,
    };
  }
}
