import $api from "../http";
import $apiJSON from "../http/apiJSON";

export async function createNewUser(
  gender,
  first_name,
  last_name,
  middle_name,
  data_of_birth,
  number_phone,
  email,
  citizenship,
  position,
  inn,
  serial,
  number,
  issued_by,
  date_of_issue,
  date_end,

  user_type,
  group,
  direction
) {
  return $api.post("/account/register/", {
    gender,
    first_name,
    last_name,
    middle_name,
    data_of_birth,
    number_phone,
    email,
    citizenship,
    position,
    inn,
    serial,
    number,
    issued_by,
    date_of_issue,
    date_end,
   
    user_type,
    group,
    direction
  });
}
