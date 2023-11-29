import enum


class WandbSortByEnum(str, enum.Enum):
    HOTKEY = "hotkey"
    RECENT = "recent"
    UID = "uid"

    def is_hotkey(self) -> bool:
        return self == WandbSortByEnum.HOTKEY

    def is_recent(self) -> bool:
        return self == WandbSortByEnum.RECENT

    def is_uid(self) -> bool:
        return self == WandbSortByEnum.UID
