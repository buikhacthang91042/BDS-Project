"use client";
import { useEffect, useState } from "react";
import styles from "./FilterModal.module.css";

type Option = {
  label: string;
  value: string;
  children?: Option[];
};

type Props = {
  title: string;
  options: Option[];
  type: "radio" | "checkbox";
  defaultSelected?: string[];
  onApply: (selected: string[]) => void;
  onClose: () => void;
};

export default function FilterModal({
  title,
  options,
  type,
  defaultSelected = [],
  onApply,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  // helper: lấy tất cả value (trừ all)
  const getAllValues = () => {
    const vals: string[] = [];
    options.forEach((o) => {
      if (o.value !== "all") vals.push(o.value);
      o.children?.forEach((c) => vals.push(c.value));
    });
    return vals;
  };

  // helper: đồng bộ trạng thái "all"
  const syncAll = (newSelected: string[]) => {
    const allValues = getAllValues();
    if (
      allValues.length > 0 &&
      allValues.every((v) => newSelected.includes(v))
    ) {
      if (!newSelected.includes("all")) newSelected.push("all");
    } else {
      newSelected = newSelected.filter((v) => v !== "all");
    }
    return newSelected;
  };

  // toggle parent
  const toggleParent = (opt: Option) => {
    let newSelected = [...selected];

    if (opt.value === "all") {
      if (newSelected.includes("all")) {
        newSelected = [];
      } else {
        const allValues = getAllValues();
        newSelected = [...allValues, "all"];
      }
    } else {
      if (type === "radio") {
        newSelected = [opt.value];
      } else {
        if (newSelected.includes(opt.value)) {
          newSelected = newSelected.filter((v) => v !== opt.value);
          if (opt.children) {
            newSelected = newSelected.filter(
              (v) => !opt.children!.map((c) => c.value).includes(v)
            );
          }
        } else {
          newSelected.push(opt.value);
          if (opt.children) {
            opt.children.forEach((c) => {
              if (!newSelected.includes(c.value)) newSelected.push(c.value);
            });
          }
        }
      }
    }

    newSelected = syncAll(newSelected);
    setSelected(newSelected);
  };

  // toggle child
  const toggleChild = (parent: Option, child: Option) => {
    let newSelected = [...selected];

    if (type === "radio") {
      newSelected = [child.value];
    } else {
      if (newSelected.includes(child.value)) {
        newSelected = newSelected.filter((v) => v !== child.value);
      } else {
        newSelected.push(child.value);
      }

      if (parent.children?.every((c) => newSelected.includes(c.value))) {
        if (!newSelected.includes(parent.value)) newSelected.push(parent.value);
      } else {
        newSelected = newSelected.filter((v) => v !== parent.value);
      }
    }

    newSelected = syncAll(newSelected);
    setSelected(newSelected);
  };

  const handleReset = () => {
    if (type === "radio") {
      // radio (giá + diện tích) → quay về "all" nếu có, nếu không thì bỏ chọn hết
      const allOption = options.find((o) => o.value === "all");
      if (allOption) {
        setSelected(["all"]);
      } else {
        setSelected([]);
      }
    } else {
      // checkbox (loại nhà đất) → bỏ hết tick
      setSelected([]);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button onClick={onClose}>x</button>
      </div>

      <ul className={styles.options}>
        {options.map((opt) => (
          <li key={opt.value}>
            <label className={styles.parent}>
              <input
                type={type}
                name={title}
                value={opt.value}
                checked={selected.includes(opt.value)}
                onChange={() => toggleParent(opt)}
                autoFocus={
                  type === "radio" &&
                  opt.value === "all" &&
                  selected[0] === "all"
                }
              />{" "}
              {opt.label}
            </label>

            {opt.children && (
              <ul className={styles.subOptions}>
                {opt.children.map((child) => (
                  <li key={child.value}>
                    <label>
                      <input
                        type={type}
                        name={title}
                        value={child.value}
                        checked={selected.includes(child.value)}
                        onChange={() => toggleChild(opt, child)}
                      />{" "}
                      {child.label}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <button onClick={handleReset}>Đặt lại</button>
        <button
          className={styles.apply}
          onClick={() => {
            onApply(selected);
            onClose();
          }}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
