{ pkgs, ... }: {
  channel = "unstable";
  packages = [
    pkgs.nodejs_20
    pkgs.python3
    pkgs.git
  ];
  env = {};
  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
          manager = "web";
        };
      };
    };
    workspace = {
      onCreate = {
      };
    };
  };
}
