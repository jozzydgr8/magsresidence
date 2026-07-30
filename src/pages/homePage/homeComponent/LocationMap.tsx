import { FlatButton } from "../../../shared/FlatButton";
import {RightOutlined} from '@ant-design/icons';
interface LocationMapProps {
  address: string;
}

export default function LocationMap({ address }: LocationMapProps) {
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className="overflow-hidden rounded-xl shadow">
      <iframe
        title={address}
        width="100%"
        height="300"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
        src={`https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed`}
      />

      
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          
        >
          <FlatButton title="Open in Google Maps " className="btn btn-lg btn-primary w-100" icon={<RightOutlined/>}/>
        </a>
      
    </div>
  );
}