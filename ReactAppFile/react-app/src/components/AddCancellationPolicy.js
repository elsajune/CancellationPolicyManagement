import { Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const AddCancellationPolicy = () => {
    return (
        <div>
            <div class="alert alert-primary" role="alert">
                Add Car Rental Cancellation Policy
            </div>
            <Card>
                <Card.Body><input
                    type="text" />
                    <input
                        type="text" />
                    <input
                        type="text" /></Card.Body>
            </Card>

        </div>);
}
export default AddCancellationPolicy;