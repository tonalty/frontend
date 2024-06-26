interface Props {
  isInvertedColor: boolean;
}

export const ReferralIcon = (props: Props) => {
  if (props.isInvertedColor) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="url(#paint0_linear_39_789)" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.6189 11.9466C21.671 11.9466 20.1536 13.4606 20.1536 15.2534C20.1536 17.0462 21.671 18.5602 23.6189 18.5602C25.5669 18.5602 27.0843 17.0462 27.0843 15.2534C27.0843 13.4606 25.5669 11.9466 23.6189 11.9466ZM18.175 15.2534C18.175 12.3009 20.6464 9.96802 23.6189 9.96802C26.5914 9.96802 29.0628 12.3009 29.0628 15.2534C29.0628 18.2059 26.5914 20.5387 23.6189 20.5387C20.6464 20.5387 18.175 18.2059 18.175 15.2534ZM11.3687 14.2641C11.915 14.2641 12.3579 14.707 12.3579 15.2534V17.4862H14.7096C15.256 17.4862 15.6989 17.9291 15.6989 18.4754C15.6989 19.0218 15.256 19.4647 14.7096 19.4647H12.3579V21.6975C12.3579 22.2439 11.915 22.6868 11.3687 22.6868C10.8223 22.6868 10.3794 22.2439 10.3794 21.6975V19.4647H8.02767C7.48131 19.4647 7.03839 19.0218 7.03839 18.4754C7.03839 17.9291 7.48131 17.4862 8.02767 17.4862H10.3794V15.2534C10.3794 14.707 10.8223 14.2641 11.3687 14.2641ZM23.6189 24.2978C17.8579 24.2978 16.3806 27.5254 16.2505 28.7807C16.1941 29.3241 15.7079 29.719 15.1644 29.6626C14.621 29.6063 14.2261 29.12 14.2825 28.5766C14.5235 26.2517 16.907 22.3192 23.6189 22.3192C30.3309 22.3192 32.7143 26.2517 32.9554 28.5766C33.0117 29.12 32.6169 29.6063 32.0734 29.6626C31.53 29.719 31.0437 29.3241 30.9874 28.7807C30.8572 27.5254 29.38 24.2978 23.6189 24.2978Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_39_789"
            x1="20"
            y1="0"
            x2="20"
            y2="40"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#006EE6" />
            <stop offset="1" stopColor="#007AFF" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="24" fill="#007AFF" fillOpacity="0.08" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.6189 15.9463C25.671 15.9463 24.1536 17.4603 24.1536 19.2531C24.1536 21.0459 25.671 22.5599 27.6189 22.5599C29.5669 22.5599 31.0843 21.0459 31.0843 19.2531C31.0843 17.4603 29.5669 15.9463 27.6189 15.9463ZM22.175 19.2531C22.175 16.3006 24.6464 13.9678 27.6189 13.9678C30.5914 13.9678 33.0628 16.3006 33.0628 19.2531C33.0628 22.2057 30.5914 24.5385 27.6189 24.5385C24.6464 24.5385 22.175 22.2057 22.175 19.2531ZM15.3687 18.2639C15.915 18.2639 16.3579 18.7068 16.3579 19.2531V21.4859H18.7096C19.256 21.4859 19.6989 21.9288 19.6989 22.4752C19.6989 23.0216 19.256 23.4645 18.7096 23.4645H16.3579V25.6973C16.3579 26.2436 15.915 26.6865 15.3687 26.6865C14.8223 26.6865 14.3794 26.2436 14.3794 25.6973V23.4645H12.0277C11.4813 23.4645 11.0384 23.0216 11.0384 22.4752C11.0384 21.9288 11.4813 21.4859 12.0277 21.4859H14.3794V19.2531C14.3794 18.7068 14.8223 18.2639 15.3687 18.2639ZM27.6189 28.2976C21.8579 28.2976 20.3806 31.5252 20.2505 32.7804C20.1941 33.3239 19.7079 33.7187 19.1644 33.6624C18.621 33.606 18.2261 33.1198 18.2825 32.5763C18.5235 30.2515 20.907 26.319 27.6189 26.319C34.3309 26.319 36.7143 30.2515 36.9554 32.5763C37.0117 33.1198 36.6169 33.606 36.0734 33.6624C35.53 33.7187 35.0437 33.3239 34.9874 32.7804C34.8572 31.5252 33.38 28.2976 27.6189 28.2976Z"
        fill="#007AFF"
      />
    </svg>
  );
};