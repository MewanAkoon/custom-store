import axios from 'axios';
import { toast } from 'react-toastify';
import { userLoggedOut } from '../../store/login';

const handleUserDelete = async (id, dispatch) => {
  try {
    // Gets products created by the user
    const { data: products } = await axios.get(`/api/products/user/${id}`);

    // delete each product
    products.forEach(
      async product => await axios.delete(`/api/products/${product._id}`)
    );

    // delete the user
    await axios.delete(`/api/users/${id}`);
    dispatch(userLoggedOut());
    toast.success('Successfully deleted the user');
  } catch (err) {
    console.log(err);
  }
};

export default handleUserDelete;